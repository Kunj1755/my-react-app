import React, { Component } from 'react';
//Takes a configuration and returns a function
// const withClass = (WrappedComponent, className) => {
//     return (props) => (<div className={className}>
//         {/* Never manipulate your WrappedComponent here, just use it */}
//         {/* Pass the props as you get them */}
//         <WrappedComponent {...props} />
//     </div>
//     )
// }

const withClass = (WrappedComponent, className) => {
    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
                </div>
            )
        }
    }
    // forwardRef is the higher order component which we export in this file and which we then use in Person.js file
    // forwardRef is a method provided by react which in the end will simply get the props you passed to your component
    return React.forwardRef((props, ref) => {
        // You can give any name in place of 'forwardedRef'
        return <WithClass {...props} forwardedRef={ref} />
    });
}

export default withClass;