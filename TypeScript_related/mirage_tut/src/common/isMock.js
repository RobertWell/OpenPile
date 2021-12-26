export const isMock  = () => {
    return process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_STAGE === "mock"
}