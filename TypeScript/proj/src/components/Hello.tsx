import * as React from 'react'

export interface HelloProps {
  compiler: string
  framework: string
}

// 无状态组件

export const Hello0 = (props: HelloProps) => (
  <h1>
    Hello from {props.compiler} and {props.framework}!
  </h1>
)

// 更像类的组件

export class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
      <h1>
        Hello from {this.props.compiler} 1and {this.props.framework}!
      </h1>
    )
  }
}
