import { Component, ReactNode } from 'react';

import { ReturnComponentType } from 'common/types';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public render(): ReturnComponentType {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Sorry.. there was an error</h1>;
    }

    return <>{this.props.children}</>;
  }
}
