import { render, screen } from "@testing-library/react";
import { Content } from ".";

describe('Content', () => {
  it('render properly', () => {
    render(
      <Content>
        <h1 data-testid="testId">Fake Content</h1>
      </Content>
    )

    const content = screen.getByTestId('testId')

    expect(content).toHaveTextContent('Fake Content')
  })
})