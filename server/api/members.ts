export default defineEventHandler((event) => {
  const config = useRuntimeConfig();

  const fetchResult = $fetch(
    `${config.ETERNALCODE_STRAPI_URL}/api/team-members?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${config.ETERNALCODE_STRAPI_KEY}`,
      },
    },
  );

  return fetchResult;
});
