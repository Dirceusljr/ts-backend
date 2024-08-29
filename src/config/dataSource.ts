import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: './src/config/database.sqlite',
    entities: [],
    synchronize: true
})