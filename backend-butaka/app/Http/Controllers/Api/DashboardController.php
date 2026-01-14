<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\User;
use App\Models\Visitor;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    use ApiResponse;

    /**
     * Get dashboard statistics
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total_users' => User::count(),
            'total_receptionists' => User::where('role', 'resepsionis')->count(),
            'total_visitors_today' => Visitor::today()->count(),
            'current_visitors' => Visitor::berkunjung()->count(),
            'waiting_visitors' => Visitor::menunggu()->count(),
            'avg_rating' => round(Feedback::avg('rating'), 1),
            'total_feedback' => Feedback::count(),
        ];

        return $this->success($stats);
    }

    /**
     * Get recent visitors
     */
    public function recentVisitors(): JsonResponse
    {
        $visitors = Visitor::latest()->take(5)->get();
        return $this->success($visitors);
    }

    /**
     * Get rating breakdown for charts
     */
    public function ratingBreakdown(): JsonResponse
    {
        $breakdown = Feedback::select('rating', DB::raw('count(*) as count'))
            ->groupBy('rating')
            ->orderBy('rating', 'desc')
            ->get();

        return $this->success($breakdown);
    }

    /**
     * Get visitor trends (last 7 days)
     */
    public function visitorTrends(): JsonResponse
    {
        $trends = Visitor::select(
            DB::raw('DATE(check_in_time) as date'),
            DB::raw('count(*) as total')
        )
            ->where('check_in_time', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return $this->success($trends);
    }
}
