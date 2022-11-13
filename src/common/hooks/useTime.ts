export const useTime = (time: number) => {
    const refTime = new Date(time * 1000);
    return `${refTime.getDate()}.${refTime.getMonth() + 1}.${refTime.getFullYear()}`
}