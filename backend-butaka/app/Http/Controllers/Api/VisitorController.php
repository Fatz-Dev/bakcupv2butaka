<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVisitorRequest;
use App\Models\Visitor;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Visitor::latest();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date
        if ($request->has('date')) {
            $query->whereDate('check_in_time', $request->date);
        }

        // Filter today shortcut
        if ($request->has('today')) {
            $query->today();
        }

        return $this->success($query->get());
    }

    /**
     * Store a newly created resource in storage (Check-in).
     */
    public function store(StoreVisitorRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $validated['status'] = 'menunggu';
        $validated['check_in_time'] = now();

        $visitor = Visitor::create($validated);

        return $this->success($visitor, 'Welcome! Please wait to be called.', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $visitor = Visitor::find($id);

        if (!$visitor) {
            return $this->error('Visitor not found', 404);
        }

        return $this->success($visitor);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $visitor = Visitor::find($id);

        if (!$visitor) {
            return $this->error('Visitor not found', 404);
        }

        $validated = $request->validate([
            'name' => ['string', 'max:255'],
            'phone' => ['string', 'max:20'],
            'email' => ['nullable', 'string', 'email'],
            'purpose' => ['string', 'max:255'],
            'host_name' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'status' => ['in:menunggu,berkunjung,selesai'],
        ]);

        $visitor->update($validated);

        return $this->success($visitor, 'Visitor updated successfully');
    }

    /**
     * Update visitor status.
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $visitor = Visitor::find($id);

        if (!$visitor) {
            return $this->error('Visitor not found', 404);
        }

        $validated = $request->validate([
            'status' => ['required', 'in:menunggu,berkunjung,selesai'],
        ]);

        $updateData = ['status' => $validated['status']];

        // If status changed to 'selesai', set check_out_time
        if ($validated['status'] === 'selesai' && !$visitor->check_out_time) {
            $updateData['check_out_time'] = now();
        }

        $visitor->update($updateData);

        return $this->success($visitor, 'Visitor status updated successfully');
    }

    /**
     * Checkout visitor (status -> selesai).
     */
    public function checkout(string $id): JsonResponse
    {
        $visitor = Visitor::find($id);

        if (!$visitor) {
            return $this->error('Visitor not found', 404);
        }

        if ($visitor->status === 'selesai') {
            return $this->error('Visitor already checked out', 400);
        }

        $visitor->update([
            'status' => 'selesai',
            'check_out_time' => now(),
        ]);

        return $this->success($visitor, 'Visitor checked out successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $visitor = Visitor::find($id);

        if (!$visitor) {
            return $this->error('Visitor not found', 404);
        }

        $visitor->delete();

        return $this->success(null, 'Visitor deleted successfully');
    }
}
