'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Header from '@/components/Header'
import QuestionCard from '../components/QuestionCard'

export default function AdminPage() {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetchQuestions()
  }, [])

  // These placeholders will be populated later in this guide
  const fetchQuestions = async () => {}
  const onQuestionApproved = async (id: number) => {}
  const onQuestionDisapproved = async (id: number) => {}
  const onAnswerApproved = async (answerId: number) => {}
  const onAnswerDisapproved = async (answerId: number) => {}

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto grow p-4">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        <div className="mb-4 flex justify-end">
          <Button>
            <Link href="/admin/set-user-roles">Set Roles</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onQuestionApproved={onQuestionApproved}
              onQuestionDisapproved={onQuestionDisapproved}
              onAnswerApproved={onAnswerApproved}
              onAnswerDisapproved={onAnswerDisapproved}
            />
          ))}
        </div>
      </main>
    </div>
  )
}