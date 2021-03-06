import FetchService from '../services/FetchService';

import paginationStore from '../stores/Pagination';
import entityStore from '../stores/Entity';

const getDetail = pageIndex => FetchService.get(pageIndex)
  .then((response) => {
    entityStore.setIsLoading(false);

    const data = response.data;

    paginationStore.setPage(pageIndex, data.pagination.paginationPageCount);

    if (pageIndex === 1) {
      entityStore.setList(data.articles);
    } else {
      entityStore.setList(entityStore.list.concat(data.articles));
    }
  })
  .catch((error) => {
    console.error(error);
  });

export default {
  getDetail
};
