import axios from 'axios'

export const actionsCreators = {
  getQuestions: async () => {
    // I commonly work with a strategy that includes AsyncStorage to cache
    // some data that is brought from repetitive calls or that involve other
    // expensive situations, but in this case the endpoint returns all the
    // data once and the content is random, so I keep everything simple by
    // making an axios call every time.

    const response = await axios.get(
      'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
    )
    return {
      questions: response.data.results,
    }
  },
  resetQuestions: () => {
    return {
      questions: [],
    }
  },
  saveAnswer: (answers, answer) => {
    return {
      answers: [...answers, answer],
    }
  },
  resetAnswers: () => {
    return {
      answers: [],
    }
  },
}
