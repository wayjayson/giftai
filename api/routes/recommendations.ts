import { Router, Request, Response } from 'express'
import { generateRecommendations, UserInput } from '../services/deepseek.js'
import { supabase } from '../services/supabase.js'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const userInput: UserInput = req.body

    // Robust validation
    const missingFields = [];
    if (!userInput.gender) missingFields.push('gender');
    if (!userInput.age) missingFields.push('age');
    if (!userInput.hobbies || !Array.isArray(userInput.hobbies) || userInput.hobbies.length === 0) missingFields.push('hobbies');
    if (!userInput.occasion) missingFields.push('occasion');
    if (userInput.budgetMin === undefined || userInput.budgetMin === null) missingFields.push('budgetMin');
    if (userInput.budgetMax === undefined || userInput.budgetMax === null) missingFields.push('budgetMax');

    if (missingFields.length > 0) {
       res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
      })
      return;
    }

    // Generate recommendations via DeepSeek
    const recommendations = await generateRecommendations(userInput)

    // Enrich with platform search links
    const enrichedRecommendations = recommendations.map((item: any) => ({
      ...item,
      platforms: {
        taobao: `https://s.taobao.com/search?q=${encodeURIComponent(item.name)}`,
        jd: `https://search.jd.com/Search?keyword=${encodeURIComponent(item.name)}`,
        pdd: `https://mobile.yangkeduo.com/search_result.html?search_key=${encodeURIComponent(item.name)}`,
      },
    }))

    // Save to database (asynchronously)
    // Note: In a real app, we might want to link this to a logged-in user if available.
    // For now, we'll just store it with a null user_id if not authenticated, or handle authentication later.
    // Since auth is not fully set up in this snippet, we'll skip user_id or set it if provided.
    
    // Check if we have a user_id in the request (e.g. from auth middleware)
    // const userId = (req as any).user?.id; 

    try {
      await supabase.from('recommendations').insert({
        user_input: userInput,
        recommendations: enrichedRecommendations,
        // user_id: userId // Optional
      })
    } catch (dbError) {
      console.error('Database insertion error:', dbError)
      // Continue execution even if DB save fails, as the user still needs the result
    }

    res.status(200).json({
      success: true,
      data: enrichedRecommendations,
    })
  } catch (error) {
    console.error('Recommendation Error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to generate recommendations',
    })
  }
})

export default router
