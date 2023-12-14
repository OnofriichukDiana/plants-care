import { api } from "./api";

export const crud = (name: string, requests: any = {}) => {
  return {
    // getOne: (id, relations = []) =>
    //   api(
    //     {
    //       url: `/${name}/${id}?${relations.reduce(
    //         (p, c) => p + 'relations[]=' + c + '&',
    //         '',
    //       )}`,
    //       method: 'GET',
    //       data: {},
    //     },
    //     (response) => actions.retrieve(response.data),
    //     host,
    //   ),

    getList: (args: any = {}) => {
      const { page, limit, filters = {}, sorts = [], relations = [] } = args;

      let params = [];
      if (!!page) params.push(`page=${page}&`);
      if (!!limit) params.push(`limit=${limit}&`);
      for (const key in filters) {
        if (Array.isArray(filters[key])) {
          for (const v of filters[key]) {
            params.push(key + "[]=" + encodeURIComponent(v) + "&");
          }
        } else {
          params.push(key + "=" + encodeURIComponent(filters[key]) + "&");
        }
      }

      params.push(
        sorts.reduce((p: string, c: string) => p + "sorts[]=" + c + "&", "")
      );

      params.push(
        relations.reduce(
          (p: string, c: string) => p + "relations[]=" + c + "&",
          ""
        )
      );

      return api(
        `/${name}?${params.reduce((previos, param) => previos + param, "")}`,
        {
          method: "GET",
        },
        (response: any) => response
      );
    },

    create: (entity: any) =>
      api(
        `/${name}`,
        {
          method: "POST",
          body: JSON.stringify(entity),
        },
        (response: any) => response
      ),

    upload: (entity: any, parentId: number, params: any = {}) =>
      api(
        `/${name}/${parentId}`,
        {
          method: "POST",
          body: entity,
          headers: {
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
            "Content-Length": params["Content-Length"],
          },
        },
        (response: any) => response.data
      ),

    update: (id: number | string, entity: any) =>
      api(
        `/${name}/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(entity),
        },
        (response: any) => response.data
      ),

    delete: (id: string | number) =>
      api(
        `/${name}/${id}`,
        {
          method: "DELETE",
        },
        (response: any) => response
      ),

    ...requests,
  };
};
