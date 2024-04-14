function getEnv(key: string, safeMode: Boolean = false, defaultValue: string = "") {
    const val = import.meta.env[key];

    if (!safeMode && val === undefined) {
        throw new Error(`env value ${key} not found, exiting...`);
    }

    return val ?? defaultValue;
}

const Config = {
    IS_PROD: getEnv("VITE_IS_PROD", true, "0") == "1",
    BASE_URL: "http://18.119.140.95:3000/",
}

export default Config;