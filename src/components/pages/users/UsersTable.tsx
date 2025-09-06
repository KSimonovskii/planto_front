const UsersTable = () => {

    return (

        <table className={"text-light-green"}>
            <caption>List of users</caption>
            <thead className={"border-y-2 border-base-text-color"}>
                    <tr>
                <th>Login</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Orders</th>
            </tr>
            </thead>
        </table>
    )
}

export default UsersTable