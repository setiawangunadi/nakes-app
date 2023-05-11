const mapDBToModel = ({
    id,
    role,
    email,
    phone,
    password,
    name,
    address,
    kelurahan,
    kecamatan,
    city,
    province,
    postal_code,
    birthdate,
    gender,
    created_at,
    updated_at
}) => ({
    id,
    role,
    email,
    phone,
    password,
    name,
    address,
    kelurahan,
    kecamatan,
    city,
    province,
    postal_code,
    birthdate,
    gender,
    createdAt: created_at,
    updatedAt: updated_at,
});

module.exports = { mapDBToModel };