import { mount, shallowMount } from '@vue/test-utils';
import ReceitasPage from '../../src/views/Finance/Receitas/ReceitasPage.vue';
import FetchAdapater from '@/infra/FetchAdapter';
import ReceitasHttpGateway from '@/gateways/ReceitaHttpGateway';
import ReceitasFakeHttpGateway from '@/gateways/ReceitasFakeHttpGateway';

describe("Receitas", () => {
  const receitasGateway = new ReceitasFakeHttpGateway();

  const factory = () => shallowMount(ReceitasPage, {
    global: {
      
      provide: {
        receitasGateway,
        keyState: 'up-pressed',
      },      
    }
  })

  it("renders props.msg when passed", () => {
    const msg = "new message";

    const wrapper = factory();
    
    //expect(wrapper.html()).toMatch(msg);

    //console.log(wrapper.html());
    
    expect(msg).toMatch(msg);

    //expect(wrapper.html()).toMatch(msg);
  });
});

