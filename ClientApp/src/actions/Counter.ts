export class CountTypes {
    public static readonly IncrementCountType = 'INCREMENT_COUNT';
    public static readonly DecrementCountType = 'DECREMENT_COUNT';
}

export const mapDispatchToProps = (dispatch: any) => ({
    increment: () => {
        dispatch({ type: CountTypes.IncrementCountType });
    },
    decrement: () => {
        dispatch({ type: CountTypes.DecrementCountType });
    },
});
