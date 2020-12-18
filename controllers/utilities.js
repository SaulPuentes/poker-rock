
export async function conclude(promise) {
    // initialize
    let resolution = {
        isFulfilled: undefined,
        isRejected: undefined,
        result: undefined,
        fulfilledValue: undefined,
        rejectedReason: undefined,
        detail: undefined
    };
    // when fullfilled
    const onFulfilled = (value) => {
        resolution.isFulfilled = true;
        resolution.isRejected = false;
        resolution.fulfilledValue = value;
        resolution.detail = value;
    };
    // when Rejected
    const onRejected = (reason) => {
        resolution.isFulfilled = false;
        resolution.isRejected = true;
        resolution.rejectedReason = reason;
        resolution.detail = reason;
    };
    // mockup
    resolution.result = await Promise.resolve(promise).then(onFulfilled).catch(onRejected);
    return resolution;
}
