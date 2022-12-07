const client = useSupabaseAuthClient();

const isAuthenticated = async () => {
  const { data, error } = await client.auth.getSession();
  return data.session !== null;
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!(await isAuthenticated())) {
    return navigateTo("/login");
  }
});
