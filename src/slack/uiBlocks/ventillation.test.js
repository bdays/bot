const ventillation = require('./ventillation');
const ventillationAddModalMock = require('./mockJSON/ventillation/addModalMock.json');

test('ventillation', () => {
  expect(ventillation.addModal('CUL32BQR4')).toEqual(ventillationAddModalMock);
});
