-- Mettre à jour la fonction bootstrap pour accepter aussi blinadam2@gmail.com
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

  -- Ces emails obtiennent le rôle ADMIN
  IF v_email IN ('adam@bline26.com', 'blinadam2@gmail.com') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
END;
$$;