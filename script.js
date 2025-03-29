document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let score = 0;
    
    // Calculate score
    for(let i = 1; i <= 10; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`);
        if(answer) {
            score += parseInt(answer.value);
        }
    }
    
    const maxScore = 40;
    const percentage = Math.round((score / maxScore) * 100);
    
    // Show result
    alert(`Il tuo punteggio di sostenibilità è: ${percentage}%`);
});