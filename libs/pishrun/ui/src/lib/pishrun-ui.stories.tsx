import { Story, Meta } from '@storybook/react';
import { PishrunUi, PishrunUiProps } from './pishrun-ui';

export default {
  component: PishrunUi,
  title: 'PishrunUi',
} as Meta;

const Template: Story<PishrunUiProps> = (args) => (
  <div style={{ backgroundColor: 'red' }}>
    <PishrunUi {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};
