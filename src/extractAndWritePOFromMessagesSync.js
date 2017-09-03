/* eslint-disable no-console */

import fs from 'fs';
import chalk from 'chalk';
import R from 'ramda';
import readAllMessageAsObjectSync from './readAllMessageAsObjectSync';
import poFormater from './poFormater';

function extractAndWritePOFromMessagesSync(
  srcPatterns,
  { messageKey = 'id', messageContext = 'defaultMessage', output, headerOptions },
) {
  const result = R.pipe(
    readAllMessageAsObjectSync,
    // 1. Object { messagekey: { messageContext: [[] , []] } }
    poFormater,
    // 2. String: pot formated
  )(srcPatterns, messageKey, messageContext);

  // Output
  fs.writeFileSync(output, result);
  console.log(chalk.green(`> [react-intl-po] write file -> ${output} ✔️\n`));
}

export default extractAndWritePOFromMessagesSync;
