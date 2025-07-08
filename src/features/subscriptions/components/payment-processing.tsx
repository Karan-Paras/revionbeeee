"use client";

import { TriangleAlert } from "@/assets/icons";

export default function PaymentProcessing() {
  return (
    <div className="h-screen bg-white/98 flex items-center justify-center p-4 fixed top-0 left-0 right-0 bottom-0 z-[9999]">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>

        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Processing Payment...
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Please wait while we securely process your payment. This may take a
          few moments.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-2">
            <TriangleAlert />
            <span className="font-medium text-amber-800">Important</span>
          </div>
          <p className="text-amber-700 text-sm">
            Do not close this tab or navigate away from this page until the
            payment is complete.
          </p>
        </div>
      </div>
    </div>
  );
}
