import { mount } from '@vue/test-utils';
import ReceitasPage from '../../src/views/Finance/Receitas/ReceitasPage.vue';
import ReceitasFakeHttpGateway from '@/services/receitas/gateways/ReceitasFakeHttpGateway';

describe("Receitas", () => {
  const receitasGateway = new ReceitasFakeHttpGateway();

  const factory = () => mount(ReceitasPage, {
    global: {
      provide: {
        receitasGateway: receitasGateway
      },      
    }
  })

  it("renders props.msg when passed", () => {
    const msg = "new message";

    const wrapper = factory();
    
    expect(msg).toMatch(msg);

    console.log(wrapper.html());
  });
});

