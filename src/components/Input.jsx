import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId()

    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-2 inline-block pl-1 text-sm font-medium tracking-wide text-zinc-300"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                {...props}
                className={`w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-500 transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-900 focus:shadow-[0_0_20px_rgba(161,161,170,0.15)] ${className}`}
            />
        </div>
    )
})

export default Input