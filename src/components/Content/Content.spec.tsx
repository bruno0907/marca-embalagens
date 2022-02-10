import { render, screen } from "@testing-library/react";
import { Content } from ".";

describe('<Content/>', () => {
  it('should render properly with its children property', () => {
    render(
      <Content data-testid="content">
        <h1 data-testid="children" />
      </Content>
    )

    const content = screen.getByTestId('content')
    const children = screen.getByTestId('children')

    expect(content).toBeInTheDocument()
    expect(children).toBeInTheDocument()
  })
})