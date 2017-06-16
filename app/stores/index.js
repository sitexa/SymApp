import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';

import articles from './Articles';
import pagination from './Pagination';

useStrict(true);
if (process.env.NODE_ENV === 'dev') {
  enableLogging({
    predicate: () => __DEV__ && Boolean(global.navigator.userAgent),
    action: true,
    reaction: true,
    transaction: true,
    compute: true
  });
}

export default {
  articles,
  pagination
};