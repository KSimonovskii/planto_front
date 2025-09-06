interface MsgProps {
    msg: string;
}

const EmptyRowTable = (props: MsgProps) => {
    return (
        <tr>
            <th
                className={"text-base-form text-2xl font-medium text-center"}
                colSpan={7}>{props.msg}
            </th>
        </tr>
    )
}

export default EmptyRowTable;