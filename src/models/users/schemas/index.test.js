import expect from 'expect';
import { Schema as MongooseSchema } from 'mongoose';
import schema from '.';

describe('models/users/schemas', () => {
    it('should exist', () => {
        expect(schema).toBeDefined();
    });

    it('should export correct model / schema types', () => {
        expect(schema).toBeInstanceOf(MongooseSchema);
    });
});
