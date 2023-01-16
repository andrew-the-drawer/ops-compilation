import minimist from 'minimist';
import _ from 'lodash';

export const parseCommandArgs = <T>(
  opts?: minimist.Opts,
  selectKeys?: (keyof T)[],
) => {
  const res = minimist<T>(process.argv.slice(2), opts);
  if (!selectKeys) {
    return res;
  }
  return _.pick(res, selectKeys);
};
