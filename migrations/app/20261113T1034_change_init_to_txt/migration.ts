#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/18aca1d6e7f752885dddee659d615452e4c4b2a03e2a3f641a8e8a8482324629/contract';
import startContract from '../../snapshots/18aca1d6e7f752885dddee659d615452e4c4b2a03e2a3f641a8e8a8482324629/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/62afa931661a53ab72e8c22d25e7058ea6a4baa5c463b9b7266d262454c84d59/contract';
import endContract from '../../snapshots/62afa931661a53ab72e8c22d25e7058ea6a4baa5c463b9b7266d262454c84d59/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.alterColumnType({
        schema: 'public',
        table: 'Bus',
        column: 'car_no',
        type: 'text',
        operationClass: 'widening',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
