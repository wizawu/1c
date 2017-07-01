import { Client } from "./client";
export declare abstract class JDBCClient implements Client {
    protected connection: java.sql.Connection;
    protected defaultEngine: string;
    protected interactedAt: number;
    protected url: string;
    protected SQL_UNIX_TIMESTAMP: string;
    protected WAIT_TIMEOUT: number;
    protected abstract connect(): void;
    get<T>(bucket: string, key: string): T | null;
    setInt(bucket: string, key: string, value: number, ttl?: number): void;
    setFloat(bucket: string, key: string, value: number, ttl?: number): void;
    setString(bucket: string, key: string, value: string, ttl?: number): void;
    setJSON(bucket: string, key: string, json: object, ttl?: number): void;
    setBlob(bucket: string, key: string, data: byte[], ttl?: number): void;
    ensureTable(table: string, pkey: string, type: string): void;
    ensureColumn(table: string, column: string, type: string): void;
    ensureIndex(table: string, columns: string[]): void;
    ensureUniqueIndex(table: string, columns: string[]): void;
    one<T>(sql: string, parameters?: any[]): T | null;
    list<T>(sql: string, parameters?: any[]): T[];
    insert(table: string, obj: object): void;
    upsert(table: string, obj: object): void;
    execute(sql: string, parameters?: any[]): void;
    delete(bucket_or_table: string, key: number | string): void;
    close(): void;
    private prepareStatement(sql, parameters?);
    private setByType(bucket, type, key, value, ttl?);
}
