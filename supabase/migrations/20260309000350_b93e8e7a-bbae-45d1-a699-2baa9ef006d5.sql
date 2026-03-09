-- Ensure user_roles supports ON CONFLICT(user_id, role)
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_user_id_role_key
ON public.user_roles (user_id, role);

-- Bootstrap function: creates minimal rows for the current user and assigns ADMIN only to the allowed email
CREATE OR REPLACE FUNCTION public.bootstrap_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_email text;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT u.email INTO v_email
  FROM auth.users u
  WHERE u.id = v_user_id;

  -- Ensure profile exists
  INSERT INTO public.profiles (user_id)
  VALUES (v_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Ensure base role exists
  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user_id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Only this email gets ADMIN
  IF v_email = 'adam@bline26.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;

-- Lock down function execution
REVOKE ALL ON FUNCTION public.bootstrap_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bootstrap_user() TO authenticated;