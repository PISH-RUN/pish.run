import { render } from '@testing-library/react';

import PishrunUi from './pishrun-ui';

describe('PishrunUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PishrunUi />);
    expect(baseElement).toBeTruthy();
  });
});
