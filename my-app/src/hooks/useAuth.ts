// const authorizedFetch = async (url, options = {}) => {
//   // Ensure cookies are always sent
//   options.credentials = "include";

//   const response = await fetch(url, options);

//   if (response.status === 401) {
//     // The cookie is gone/expired! 
//     // Redirect to login or refresh page to trigger AuthProvider update
//     window.location.href = "/login";
//   }

//   return response;
// };

// export default authorizedFetch;