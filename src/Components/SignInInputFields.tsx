

export default function SignInInputFields(props) {
    if (props.type === 'select' && props.options.length > 0) {
        return (
            <div className="mb-4">
                <select
                    id={props.id}
                    className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                    required
                    onChange={props.onChange}
                >
                    {props.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );

    }
    return (
        <div className="relative mb-4">
      <span className="absolute left-3 top-3 text-gray-500">
        <i className={props.icon}></i>
      </span>
            <input
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                className="w-full pl-10 p-3 border rounded-lg focus:ring focus:ring-green-300"
                required
                onChange={props.onChange}
            />
        </div>
    );

}