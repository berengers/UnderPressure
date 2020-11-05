import React, { useState } from 'react'

import './shareTestForm.scss'
import { usePostAPI } from 'Services/hook/api'
import { minuteToMs } from 'Services/time'
import Button from 'Lib/buttons/button/button'

interface PropsInterface {
  testId: number
}

export default function ShareTestForm({ testId }: PropsInterface) {
  const [maxTimeToComplete, setMaxTimeToComplete] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [postLink, postData] = usePostAPI<{ uuid: string | undefined }>(
    'testRun'
  )
  const shareLink = `${process.env.REACT_APP_BASE_URL}/test/${postData?.uuid}/0`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'player-name') {
      setPlayerName(e.target.value)
    } else {
      setMaxTimeToComplete(e.target.value)
    }
  }

  const createLink = async () => {
    postLink({
      maxTimeToComplete: minuteToMs(maxTimeToComplete),
      playerName,
      testId
    })
  }

  return (
    <div className="ShareTestForm">
      <h2 className="ShareTestForm-title">
        Create a unique link for a player and follow these results
      </h2>
      <div className="ShareTestForm-inputsContainer">
        <input
          name="player-name"
          onChange={handleChange}
          placeholder="Player Name"
          type="text"
          value={playerName}
        />
        <br />
        <input
          name="max-time-to-complete"
          onChange={handleChange}
          placeholder="Max time to complete (in minutes)"
          type="number"
          value={maxTimeToComplete}
        />
        <br />
        {postData && postData.uuid ? (
          <div>
            <div>{shareLink}</div>
            <small>You must be logged out to start the test</small>
          </div>
        ) : (
          <Button
            color="var(--color-info)"
            disable={!playerName || !maxTimeToComplete}
            fullWidth
            onClick={createLink}
          >
            Create Link
          </Button>
        )}
      </div>
    </div>
  )
}
