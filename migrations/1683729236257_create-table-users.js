/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        role: {
            type: 'NUMERIC',
            notNull: true,
        },
        email: {
            type: 'TEXT',
            notNull: true,
        },
        phone: {
            type: 'NUMERIC',
            notNull: true,
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        address: {
            type: 'TEXT',
            notNull: true,
        },
        kelurahan: {
            type: 'TEXT',
            notNull: true,
        },
        kecamatan: {
            type: 'TEXT',
            notNull: true,
        },
        city: {
            type: 'TEXT',
            notNull: true,
        },
        province: {
            type: 'TEXT',
            notNull: true,
        },
        postal_code: {
            type: 'NUMERIC',
            notNull: true,
        },
        birthdate: {
            type: 'DATE',
            notNull: true,
        },
        gender: {
            type: 'TEXT',
            notNull: true
        },
        created_at: {
          type: 'TEXT',
          notNull: true,
        },
        updated_at: {
          type: 'TEXT',
          notNull: true,
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('users');
};
