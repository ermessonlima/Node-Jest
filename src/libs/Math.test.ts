import { Math } from './Math';

describe('Math', () => {

    beforeEach(() => {
        console.log('beforeEach');
    }
    );

    afterEach(() => {
        console.log('afterEach');
    }
    );

    beforeAll(() => {
        console.log('beforeAll');
    }
    );

    afterAll(() => {
        console.log('afterAll');
    }
    );

it("should sum two numbers correctly", () => {
    const result = Math.sum(1, 2);
    expect(result).toBe(3);
}
);


it("should sub two numbers correctly", () => {
    const result = Math.sub(1, 2);
    expect(result).toBe(-1);
}
);


it("should div two numbers correctly", () => {
    const result = Math.div(1, 2);
    expect(result).toBe(0.5);
}
);

it("should mul two numbers correctly", () => {
    const result = Math.mul(1, 2);
    expect(result).toBe(2);
}
);

it("contar quantos caracteres tem uma string", () => {
    const result = Math.countChar("teste");
    expect(result).toBe(5);

    const result2 =  "teste2"

    expect(result2).toHaveLength(6);

});

it("verificar propriedade", () => {
    const test = {
        name: "teste",
        age: 20
    }

    expect(test).toHaveProperty("name");
});

});