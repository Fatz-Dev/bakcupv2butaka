<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFeedbackRequest;
use App\Models\Feedback;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class FeedbackController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $feedback = Feedback::latest()->get();
        return $this->success($feedback);
    }

    /**
     * Store a newly created resource in storage (Submit Feedback).
     */
    public function store(StoreFeedbackRequest $request): JsonResponse
    {
        $feedback = Feedback::create($request->validated());

        return $this->success($feedback, 'Thank you for your feedback!', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return $this->error('Feedback not found', 404);
        }

        return $this->success($feedback);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return $this->error('Feedback not found', 404);
        }

        $feedback->delete();

        return $this->success(null, 'Feedback deleted successfully');
    }
}
