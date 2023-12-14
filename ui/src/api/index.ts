import { api } from "./api";
import { crud } from "./crud";

export { authApi } from "./authApi";

export const postsApi = crud("posts");
export const postFilesApi = crud("post-files");
export const postLikesApi = crud("post-likes", {
  isLiked: (postId: number) =>
    api(
      `/post-likes/${postId}/is-liked`,
      {
        method: "GET",
      },
      (response: boolean) => response
    ),
});

// export const accountantsApi = crud('accountants', actions.accountantsActions, {
//   getStatistic: (id) =>
//     api(
//       {
//         url: `/accountants/${id}/get-statistic`,
//         method: 'GET',
//       },
//       (response) => actions.accountantsActions.getStatistic(response.data),
//     ),
//   getAccountantsByEmail: (email) =>
//     api(
//       {
//         url: `/accountants/by-email/${email}`,
//         method: 'GET',
//       },
//       (response) =>
//         actions.accountantsActions.accountantsByEmail(response.data),
//     ),
//   getAccountantsRecommendedToAuthUser: () =>
//     api(
//       {
//         url: `/accountants/recommended-to-auth-user`,
//         method: 'GET',
//       },
//       (response) =>
//         actions.accountantsActions.accountantsRecommendedToAuthUser(
//           response.data,
//         ),
//     ),
//   addAccountantToGroup: ({ accountantGroupId, accountantId }) =>
//     api(
//       {
//         url: `/accountants/${accountantGroupId}/${accountantId}/add-accountant-to-group`,
//         method: 'POST',
//       },
//       (response) =>
//         actions.accountantsActions.addAccountantToGroup(response.data),
//     ),
//   deleteAccountantFromGroup: ({ accountantGroupId, accountantId }) =>
//     api(
//       {
//         url: `/accountants/${accountantGroupId}/${accountantId}/delete-accountant-from-group`,
//         method: 'DELETE',
//       },
//       (response) =>
//         actions.accountantsActions.deleteAccountantFromGroup(response.data),
//     ),
// })

// export const accountantGroupsInvitesApi = crud(
//   'accountant-groups-invites',
//   actions.accountantGroupsInvitesActions,
// )

// export const accountantsToAddressesApi = crud(
//   'accountants-to-addresses',
//   actions.accountantsToAddressesActions,
// )

// export const companiesApi = crud('companies', actions.companiesActions, {
//   getCompaniesByEmail: (email) =>
//     api(
//       {
//         url: `/companies/by-email/${email}`,
//         method: 'GET',
//       },
//       (response) => actions.companiesActions.companiesByEmail(response.data),
//     ),
//   getCompaniesRecommendedToAuthUser: () =>
//     api(
//       {
//         url: `/companies/recommended-to-auth-user`,
//         method: 'GET',
//       },
//       (response) =>
//         actions.companiesActions.companiessRecommendedToAuthUser(response.data),
//     ),
// })

// export const invoicesApi = crud('invoices', actions.invoicesActions, {
//   generetePdf: (id) =>
//     api(
//       {
//         url: `/invoices/${id}/generate-pdf`,
//         method: 'GET',
//         responseType: 'blob',
//       },
//       (response) => {
//         const url = URL.createObjectURL(response.data)
//         return actions.invoicesActions.generetePdf(url)
//       },
//     ),

//   getStatistic: (accountantId) =>
//     api(
//       {
//         url: `/invoices/get-statistic-for-accountant/${accountantId}`,
//         method: 'GET',
//       },
//       (response) => {
//         return actions.invoicesActions.getStatistic(response.data)
//       },
//     ),
// })
