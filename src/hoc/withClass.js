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
    // Returning anonymous class
    return class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
}

export default withClass;