import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { BlogPost } from '../BlogPost.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(BlogPost, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  });
});
