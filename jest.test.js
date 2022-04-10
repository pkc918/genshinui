test('test common', () => {
    expect((2 + 2)).toBe(4)
    expect(2 + 2).not.toBe(5)
})

test('equal', () => {
    expect({name: 'pkc'}).toEqual({name: 'pkc'})
})
