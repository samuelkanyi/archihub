const isDev = true;

const config = isDev ? {
    HOST: 'localhost',
    DATABASE: 'archihub',
    USER: 'root',
    PASS: '',
    PORT: 8080,
    SECRET:'blowme',
    ROOTPATH:"/",
} : {
    HOST: 'mutalldevs.co.ke',
    DATABASE: 'mutallde_archihub',
    USER: 'mutallde',
    PASS: 'mutalldatamanagers',
    PORT: process.env.PORT,
    SECRET:'blowme'
}

module.exports = config;