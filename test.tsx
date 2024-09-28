'use client'

import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

interface AddToWishlistProps {
 productId: string
 userId?: string
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({
 productId,
 userId: initialUserId
}) => {
 const [addedToWishlist, setAddedToWishlist] = useState(false)
 const [userId, setUserId] = useState<string | null>(initialUserId || null)
 const router = useRouter()

 // Function to get token from cookies in client-side
 const getTokenFromCookies = () => {
  const cookies = document.cookie.split('; ')
  const tokenCookie = cookies.find((row) => row.startsWith('token='))
  if (tokenCookie) {
   return tokenCookie.split('=')[1]
  }
  return null
 }

 useEffect(() => {
  if (!userId) {
   // Check if token is in localStorage
   const token = localStorage.getItem('token')

   console.log('Token from localStorage:', token) // Debugging: log token

   if (token) {
    try {
     const decodedToken = JSON.parse(atob(token.split('.')[1]))
     console.log('Decoded Token:', decodedToken) // Debugging: log decoded token
     setUserId(decodedToken.userId)
    } catch (error) {
     console.error('Failed to decode token:', error)
    }
   } else {
    console.log('No token found in localStorage')
    setUserId(null)
   }
  }
 }, [userId])

 const handleWishlist = async () => {
  if (!userId) {
   // Show toast if user is not logged in
   toast.error('You must be logged in to add to wishlist')
   router.push('/login') // Redirect to login page
   return
  }

  if (!productId) {
   toast.error('ProductId is required')
   return
  }

  try {
   const response = await fetch('/api/wishlists', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, productId })
   })

   const data = await response.json()

   console.log('Response Status:', response.status) // Debugging: log response status
   console.log('Response Data:', data) // Debugging: log response data

   if (!response.ok) {
    toast.error(data.error || 'Failed to add to wishlist')
    return
   }

   setAddedToWishlist(true)
   toast.success('Added to wishlist')
  } catch (error) {
   console.error('Error while adding to wishlist:', error) // Better error logging
   toast.error('Something went wrong')
  }
 }

 return (
  <button
   className="bg-yellow-500 text-white p-1 rounded-full transition-opacity duration-300"
   aria-label="Add to Wishlist"
   onClick={handleWishlist}
  >
   <AiFillStar
    className={`w-5 h-5 ${addedToWishlist ? 'text-yellow-300' : ''}`}
   />
  </button>
 )
}

export default AddToWishlist
