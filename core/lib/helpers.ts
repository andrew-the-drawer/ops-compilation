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

export const readFullInputFromStdin = async () => {
  return new Promise<string>((resolve, reject) => {
    let resultInput = '';
    process.stdin.on('data', (chunk) => {
      resultInput += chunk.toString();
    });
    process.stdin.on('end', () => {
      resolve(resultInput);
    });
    process.stdin.on('error', (err) => {
      reject(err);
    });
  });
};

export const forOwnRecursive = (
  obj: any,
  iteratee: (value: any, path: string[], obj: any) => any = _.identity,
) => {
  return _.forOwn(obj, (value, key) => {
    const path = [key.toString()];
    if (_.isPlainObject(value) || _.isArray(value)) {
      return forOwnRecursive(value, (v, p) =>
        iteratee(v, path.concat(p || []), obj),
      );
    }
    return iteratee(value, path, obj);
  });
};

export const removeNullValuesFromObject = (obj: any) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return value === null ? undefined : value;
    }),
  );
};
