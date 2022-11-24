const getTimeStamp = (): string => 
{
    return new Date().toISOString();
};

const debug = (message: string, object?: any) => 
{
    if (object)
    {
        console.info(`[${getTimeStamp()}][DEBUG] ${message}`, object);
    }
    else
    {
        console.info(`[${getTimeStamp()}][DEBUG] ${message}`);
    }
}

const info = (message: string, object?: any) => 
{
    if (object)
    {
        console.info(`[${getTimeStamp()}][INFO] ${message}`, object);
    }
    else
    {
        console.info(`[${getTimeStamp()}][INFO] ${message}`);
    }
}

const error = (message: string, object?: any) => 
{
    if (object)
    {
        console.info(`[${getTimeStamp()}][ERROR] ${message}`, object);
    }
    else
    {
        console.info(`[${getTimeStamp()}][ERROR] ${message}`);
    }
}

const warn = (message: string, object?: any) => 
{
    if (object)
    {
        console.info(`[${getTimeStamp()}][WARN] ${message}`, object);
    }
    else
    {
        console.info(`[${getTimeStamp()}][WARN] ${message}`);
    }
}

export default 
{
    info,
    warn,
    error, 
    debug
}