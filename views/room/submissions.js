module.exports = (submissions) => submissions.map((i) => `<li>${i.name}</li>`).join('') || '  '